import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { error } from 'console';
import { NotFoundError } from 'rxjs';
import { Order } from 'src/order/models/order.model';

@Injectable()
export class AdminClientSelfGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Order) private readonly orderModel: typeof Order,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      throw new UnauthorizedException('Unauthorized user');
    }

    const bearer = authHeaders.split(' ')[0];
    const token = authHeaders.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Unauthorized user');
    }

    let payload: any;
    try {
      payload = await this.jwtService.verify(token, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    if (!payload) {
      try {
        payload = await this.jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
        if (!payload) {
          throw new UnauthorizedException('Unauthorized client');
        }
        if (payload.is_active !== true) {
          throw new ForbiddenException({
            message: "Sizda bunday huquq yo'q!, Active emassis!",
          });
        }
        const order = await this.orderModel.findByPk(req.params.id);
        if (!order) {
          throw new NotFoundException('This order not found');
        }
        if (+order.clientId !== payload.id) {
          throw new ForbiddenException('You are not owner of this order');
        }
        return true;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

    if (payload.is_active !== true) {
      throw new ForbiddenException('Admin active emas!');
    }

    return true;
  }
}
