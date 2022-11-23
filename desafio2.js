

const fs = require ('fs')


class Contenedor {

     // Propiedades

       file;

     // Métodos

  constructor( file ) {
      this.file = file
  }

  
  async getAll() {
    try{
      const objects = await fs.promises.readFile( this.file, 'utf-8')
      return JSON.parse(objects)

    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }
 
  
  async saveFile ( file, objects ) {
    try {
      await fs.promises.writeFile(
        file, JSON.stringify( objects, null, 2 )
        )
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


  async save( object ) {
    const objects = await this.getAll()
    try{
        let idNew
        objects.length === 0 
          ? idNew = 1
          : idNew = objects[ objects.length - 1 ].id + 1
        
        const objectNew = { id: idNew, ...object }       
        objects.push(objectNew)        
        await this.saveFile(this.file, objects)
        return idNew

    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


  async getById( id ) {
    const objects = await this.getAll()
    try {
      const object = objects.find( ele => ele.id === id)
      return object ? object : null

    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


  async deleteById( id ) {
    let objects = await this.getAll()
    
    try {
      objects = objects.filter( ele => ele.id != id )
      await this.saveFile( this.file, objects)
    
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


  async deleteAll() {
    await this.saveFile(this.file, [])
  }

}

//  Pruebas

const productos = new Contenedor('productos.txt')

const ejemplo = async() => {
  try {
    
    // Metodo getAll
    let array = await productos.getAll()
    console.log(array)


    // Metodo save
    await productos.save(
      { "title": "Globo terraqueo",
        "price": 3456.78,
        "thumbnail": "wwww.Globo-terraqueo.com"
      }
    )
    array = await productos.getAll()
    console.log(array)


    // Metodo getById
    let idResp = await productos.getById(0)
    console.log(idResp)
    idResp = await productos.getById(2)
    console.log(idResp)

    
    // Metodo deleteById
    await productos.deleteById(2)
    array = await productos.getAll()
    console.log(array)


    // Metodo deleteAll
    /* await productos.deleteAll()
    array = await productos.getAll()
    console.log(array) */


  } catch(err) {
    console.log(err)
  }
}


ejemplo()