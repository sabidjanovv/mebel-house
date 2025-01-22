import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './models/product.model';
import { PaginationDto } from './dto/pagination.dto';
import { AdminGuard } from '../common/guards/admin.guard';
import { FormDataDto } from './dto/form-data.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Mahsulotlar')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() formDataDto: FormDataDto,
    @UploadedFiles() images: any[],
  ) {
    
    const tags = formDataDto.tags ? formDataDto.tags.split(',') : [];
    const colors = formDataDto.colors ? formDataDto.colors.split(',') : [];

    return await this.productService.create(
      { ...formDataDto, tags, colors },
      images,
    );
  }

  @Get()
  @ApiOperation({
    summary:
      'Retrieve all products with optional filtering, sorting, and pagination',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Filter by product name or description',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Order of sorting',
  })
  @ApiQuery({
    name: 'price',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Order of sorting',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page',
    example: 10,
  })
  @ApiQuery({
    name: 'minPrice',
    required: false,
    description: 'Minimum price for filtering',
  })
  @ApiQuery({
    name: 'maxPrice',
    required: false,
    description: 'Maximum price for filtering',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['createdAt', 'id'],
    description: 'Sort by field (e.g., createdAt or id)',
  })
  @ApiResponse({ status: 200, description: 'List of products' })
  async findAll(@Query() query: PaginationDto) {

    const {
      filter,
      order = !query.order && !query.price ? 'desc' : undefined,
      price = !query.order && !query.price ? 'asc' : undefined,
      page = 1,
      limit = 10,
      minPrice = 0,
      maxPrice = Infinity,
      sortBy = 'createdAt',
    } = query;


    const pageNum = parseInt(page.toString(), 10);
    const limitNum = parseInt(limit.toString(), 10);
    const minPriceNum = minPrice ? parseInt(minPrice.toString(), 10) : 0;
    const maxPriceNum = maxPrice ? parseInt(maxPrice.toString(), 10) : Infinity;

    return this.productService.findAll({
      filter,
      order,
      price,
      page: pageNum,
      limit: limitNum,
      minPrice: minPriceNum,
      maxPrice: maxPriceNum,
      sortBy,
    });
  }

  @ApiOperation({ summary: 'Mahsulotni ID orqali olish' })
  @ApiResponse({
    status: 200,
    description: 'Berilgan IDga ega mahsulot.',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Mahsulot topilmadi.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      fileFilter: (req, file, callback) => {
        const allowedTypes = /jpeg|jpg|png|gif|avif/;
        const extname = allowedTypes.test(file.originalname.toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
      },
      limits: {
        fileSize: 3 * 1024 * 1024,
      },
    }),
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormDto: UpdateFormDto,
    @UploadedFiles() images: any[],
  ) {

    const tags = updateFormDto.tags.split(',');
    const colors = updateFormDto.colors.split(',');
    return this.productService.update(
      +id,
      { ...updateFormDto, tags, colors },
      images,
    );
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Mahsulotni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({
    status: 404,
    description: 'Mahsulot topilmadi.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
