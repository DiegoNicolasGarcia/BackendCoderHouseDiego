class Usuario {
    // Propiedades
    nombre ;
    apellido;
    libros = [];
    mascota = [];
  
    // Métodos
    constructor(nombre, apellido,nombreLibro, autor, mascota) {
        this.nombre = nombre; 
        this.apellido = apellido; 
        this.libros = [{nombre: nombreLibro, autor: autor}]
        this.mascota = [mascota];
      }
    getFullName() { 
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(nombreMascota) {
        this.mascota.push(nombreMascota);
    }
    countMascotas() {
        return this.mascota.length;
    }
    addBook(nombre, autor) {
        this.libros.push({nombre, autor});
    }
    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    }

  }

  const usuario = new Usuario('Diego','Garcia', 'Canción de hielo y fuego', 'George R. R. Martin', 'Nymeria');
  usuario.addMascota('Verano');
  console.log( `${usuario.nombre} tiene ${usuario.countMascotas()} mascotas`);
  usuario.addBook('Danza de dragones','George R. R. Martin');
  console.log(usuario.getFullName());
  console.log(usuario.getBookNames());
  console.log(usuario.libros);