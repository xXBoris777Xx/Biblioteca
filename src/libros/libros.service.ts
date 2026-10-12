import { Injectable, NotFoundException } from '@nestjs/common';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  disponible: boolean;
}

export type DatosLibro = Omit<Libro, 'id'>;

@Injectable()
export class LibrosService {
  private libros: Libro[] = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'García Márquez', disponible: true },
    { id: 2, titulo: 'El túnel', autor: 'Sabato', disponible: true },
    { id: 3, titulo: 'Rayuela', autor: 'Cortázar', disponible: false },
  ];

  private siguienteId = 4;

  private indiceDe(id: number): number {
    const indice = this.libros.findIndex((libro) => libro.id === id);
    if (indice === -1) {
      throw new NotFoundException(`No existe el libro ${id}`);
    }
    return indice;
  }

  listar(autor?: string): Libro[] {
    if (!autor) {
      return this.libros;
    }
    return this.libros.filter(
      (libro) => libro.autor.toLowerCase() === autor.toLowerCase(),
    );
  }

  obtener(id: number): Libro {
    return this.libros[this.indiceDe(id)];
  }

  crear(cuerpo: DatosLibro): Libro {
    const nuevo: Libro = {
      id: this.siguienteId++,
      titulo: cuerpo.titulo,
      autor: cuerpo.autor,
      disponible: cuerpo.disponible,
    };
    this.libros.push(nuevo);
    return nuevo;
  }

  reemplazar(id: number, cuerpo: DatosLibro): Libro {
    const indice = this.indiceDe(id);
    const reemplazado: Libro = {
      id,
      titulo: cuerpo.titulo,
      autor: cuerpo.autor,
      disponible: cuerpo.disponible,
    };
    this.libros[indice] = reemplazado;
    return reemplazado;
  }

  modificar(id: number, cambios: Partial<DatosLibro>): Libro {
    const indice = this.indiceDe(id);
    const modificado: Libro = { ...this.libros[indice], ...cambios, id };
    this.libros[indice] = modificado;
    return modificado;
  }

  eliminar(id: number): void {
    const indice = this.indiceDe(id);
    this.libros.splice(indice, 1);
  }
}
