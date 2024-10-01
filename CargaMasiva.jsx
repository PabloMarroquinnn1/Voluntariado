import { useState } from "react"
//Aca esta la carga masiva para deonde se miran las filas y columnas
export default function CargaM() {
    const [data, setData] = useState(null)
    const [datap, setDatap] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result)
        setData(data)
      }
      reader.readAsText(file)
    }
  }

  const handleUpload = async () => {
    if (!data) {
      alert('No hay datos para cargar')
      return
    }
    console.log(JSON.stringify(data))
    try {
      const response = await fetch('http://localhost:3000/addUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(data)
      })
      if (response.ok) {
        setData(await response.json())
        alert('Datos cargados con éxito')
      } else {
        alert('Error al cargar los datos')
      }

    } catch (error) {
      alert('Error al cargar los datos')
    }
  }

  const handleFileChangepost = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result)
        setDatap(data)
      }
      reader.readAsText(file)
    }
  }

  const handleUploadspost = async () => {
    if (!datap) {
      alert('No hay datos para cargar')
      return
    }
    try {
      const response = await fetch('http://localhost:3000/addPosts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(datap)
      })
      if (response.ok) {
        setDatap(await response.json())
        alert('Datos cargados con éxito')
      } else {
        alert('Error al cargar los datos')
      }

    } catch (error) {
      alert('Error al cargar los datos')
    }
  }
  return (
    <main className="container">
        <section>
            <h1>Usuarios</h1>
      <div className="about-header">
        <h1>Cargar Datos</h1>
        <label htmlFor="file" className="file-button">
          Selecciona un archivo JSON
          <input type="file" id="file" accept=".json" onChange={handleFileChange} />
        </label>
        <button type="button" className="light-button" onClick={handleUpload}>
          Cargar Datos
        </button>
      </div>
      <div className="about-content">
        <table>
          <thead>
            <tr>
              <th>Codigo.</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>genero</th>
              <th>facultad</th>
              <th>carrera</th>
              <th>correo</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => (
              <tr key={index + 1}>
                <td>{item.carnet}</td>
                <td>{item.nombres}</td>
                <td>{item.apellidos}</td>
                <td>{item.genero}</td>
                <td>{item.facultad}</td>
                <td>{item.carrera}</td>
                <td>{item.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </section>
        <section>
            <h1>Publicaciones</h1>
        <div className="about-header">
        <h1>Cargar Datos</h1>
        <label htmlFor="file2" className="file-button">
          Selecciona un archivo JSON
          <input type="file" id="file2"  name="file2" accept=".json" onChange={handleFileChangepost} />
        </label>
        <button type="button" className="light-button" onClick={handleUploadspost}>
          Cargar Datos
        </button>
      </div>
      <div className="about-content">
        <table>
          <thead>
            <tr>
              <th>codigo</th>
              <th>descripcion</th>
              <th>categoria</th>
              <th>anonimo</th>
            </tr>
          </thead>
          <tbody>
            {datap && datap.map((item, index) => (
              <tr key={index + 1}>
                <td>{item.codigo}</td>
                <td>{item.descripcion}</td>
                <td>{item.categoria}</td>
                <td>{item.usuario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        </section>
    </main>
  )
    
}