import { Module } from '@nestjs/common';
import { ImageService } from './service/image.service';

@Module({
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
