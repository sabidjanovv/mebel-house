import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";


export class CreateAddressDto {
  @ApiProperty({ example: 1, description: 'Client ID' })
  @IsNotEmpty({ message: 'Client ID' })
  @IsNumber({}, { message: 'Car ID must be a number' })
  clientId: number;

  @ApiProperty({ example: '123 Main St', description: 'Street' })
  @IsNotEmpty({ message: 'Street' })
  @IsString({ message: 'Street must be a string' })
  street: string;

  @ApiProperty({ example: 'Tashkent', description: 'Region name' })
  @IsNotEmpty({ message: 'Region ID' })
  region: string;

  @ApiProperty({ example: 10001, description: 'Zip Code' })
  @IsNotEmpty({ message: 'Zip Code' })
  @IsNumber({}, { message: 'Zip Code must be a number' })
  zipCode: number;

  @ApiProperty({
    description: "Client's phone number",
    example: '+998901234567',
  })
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^\+998[0-9]{9}$/, {
    message: 'Phone number must match the Uzbekistan format (+998901234567)',
  })
  phone_number: string;
}
