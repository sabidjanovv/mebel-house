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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './models/product.model';
import { PaginationDto } from './dto/pagination.dto';

@ApiTags('Mahsulotlar')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Yangi mahsulot yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi mahsulot muvaffaqiyatli yaratildi.',
    type: Product,
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
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
  @ApiResponse({ status: 200, description: 'List of products' })
  async findAll(@Query() query: PaginationDto) {
    console.log('Received query:', query);

    const { filter, order, page, limit } = query;

    const pageNum = page ? parseInt(page.toString(), 10) : 1;
    const limitNum = limit ? parseInt(limit.toString(), 10) : 10;

    // console.log('Converted pageNum:', pageNum);
    // console.log('Converted limitNum:', Number(limitNum));

    return this.productService.findAll({
      filter,
      order,
      page: pageNum,
      limit: limitNum,
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

  @ApiOperation({ summary: 'Mahsulotni yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Mahsulot muvaffaqiyatli yangilandi.',
  })
  @ApiResponse({
    status: 404,
    description: 'Mahsulot topilmadi.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

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
