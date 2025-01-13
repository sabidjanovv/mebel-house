import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductDetailService } from './product_detail.service';
import { CreateProductDetailDto } from './dto/create-product_detail.dto';
import { UpdateProductDetailDto } from './dto/update-product_detail.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDetail } from './models/product_detail.model';

@ApiTags('Mahsulot tafsilotlari')
@Controller('product-detail')
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @ApiOperation({ summary: 'Yangi mahsulot tafsilotini yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi mahsulot tafsiloti muvaffaqiyatli yaratildi.',
    type: ProductDetail,
  })
  @Post()
  create(@Body() createProductDetailDto: CreateProductDetailDto) {
    return this.productDetailService.create(createProductDetailDto);
  }

  @ApiOperation({ summary: 'Barcha mahsulot tafsilotlarini olish' })
  @ApiResponse({
    status: 200,
    description: "Barcha mahsulot tafsilotlari ro'yxati.",
    type: [ProductDetail],
  })
  @Get()
  findAll() {
    return this.productDetailService.findAll();
  }

  @ApiOperation({ summary: 'Mahsulot tafsilotlarini ID orqali olish' })
  @ApiResponse({
    status: 200,
    description: 'Berilgan IDga ega mahsulot tafsilotlari.',
    type: ProductDetail,
  })
  @ApiResponse({
    status: 404,
    description: 'Mahsulot topilmadi.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productDetailService.findOne(+id);
  }

  @ApiOperation({ summary: 'Mahsulot tafsilotlarini yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Mahsulot tafsilotlari muvaffaqiyatli yangilandi.',
  })
  @ApiResponse({
    status: 404,
    description: 'Yangilanish uchun mahsulot tafsilotlari topilmadi.',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDetailDto: UpdateProductDetailDto,
  ) {
    return this.productDetailService.update(+id, updateProductDetailDto);
  }

  @ApiOperation({ summary: "Mahsulot tafsilotlarini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot tafsilotlari muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({
    status: 404,
    description: "O'chirish uchun mahsulot tafsilotlari topilmadi.",
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productDetailService.remove(+id);
  }
}
