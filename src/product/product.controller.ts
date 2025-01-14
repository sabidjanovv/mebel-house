import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './models/product.model';

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

  @ApiOperation({ summary: 'Barcha mahsulotlarni olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha mahsulotlar ro'yxati.",
    type: [Product],
  })
  @Get()
  findAll() {
    return this.productService.findAll();
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
