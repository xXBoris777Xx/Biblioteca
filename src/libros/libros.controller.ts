import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { LibrosService } from './libros.service';
import type { DatosLibro } from './libros.service';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Get()
  listar(@Query('autor') autor?: string) {
    return this.librosService.listar(autor);
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.librosService.obtener(id);
  }

  @Post()
  crear(
    @Body() cuerpo: DatosLibro,
    @Res({ passthrough: true }) res: Response,
  ) {
    const nuevo = this.librosService.crear(cuerpo);
    res.setHeader('Location', `/libros/${nuevo.id}`);
    return nuevo;
  }

  @Put(':id')
  reemplazar(
    @Param('id', ParseIntPipe) id: number,
    @Body() cuerpo: DatosLibro,
  ) {
    return this.librosService.reemplazar(id, cuerpo);
  }

  @Patch(':id')
  modificar(
    @Param('id', ParseIntPipe) id: number,
    @Body() cambios: Partial<DatosLibro>,
  ) {
    return this.librosService.modificar(id, cambios);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  eliminar(@Param('id', ParseIntPipe) id: number) {
    this.librosService.eliminar(id);
  }
}