import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductDetailService } from './product_detail.service';
import { CreateProductDetailDto } from './dto/create-product_detail.dto';
import { UpdateProductDetailDto } from './dto/update-product_detail.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDetail } from './models/product_detail.model';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Product Details')
@Controller('product-detail')
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create new product detail' })
  @ApiResponse({
    status: 201,
    description: 'New product detail successfully created.',
    type: ProductDetail,
  })
  @Post()
  create(@Body() createProductDetailDto: CreateProductDetailDto) {
    return this.productDetailService.create(createProductDetailDto);
  }

  @ApiOperation({ summary: 'Get all product details' })
  @ApiResponse({
    status: 200,
    description: 'List of all product details.',
    type: [ProductDetail],
  })
  @Get()
  findAll() {
    return this.productDetailService.findAll();
  }

  @ApiOperation({ summary: 'Get product details by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product details with the given ID.',
    type: ProductDetail,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productDetailService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update product details' })
  @ApiResponse({
    status: 200,
    description: 'Product details successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product details not found for update.',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDetailDto: UpdateProductDetailDto,
  ) {
    return this.productDetailService.update(+id, updateProductDetailDto);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete product details' })
  @ApiResponse({
    status: 200,
    description: 'Product details successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product details not found for deletion.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productDetailService.remove(+id);
  }
}
