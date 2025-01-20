import toast from "react-hot-toast";

export default class RestProvider {
  urlRest: string;
  token: string;
  constructor() {
    this.urlRest = "https://localhost:44310/api/";
    this.token = "Bearer " + localStorage.getItem("authToken");
  }

  // USER
  // Get
  public async getUser(id: number): Promise<any> {
    try {
      const response = await fetch(`${this.urlRest}Acceso/GetUsuario/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error(`Error HTTP: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
    }
  }

  // PostLogin
  public async login(nameUser: string, passwordHash: string) {
    try {
      const response = await fetch(this.urlRest + "Acceso/Login", {
        method: "POST",
        body: JSON.stringify({
          NameUser: nameUser,
          PasswordHash: passwordHash,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "access-control-allow-origin": "*",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error(`Error HTTP: ${response.status}`);
      }
    } catch (error) {
      console.log("Error en el login:", error);
    }
  }

  // PostRegister
  public async addRegister(
    Name: string,
    LestName: string,
    NameUser: string,
    Email: string,
    PasswordHash: string
  ) {
    try {
      const response = await fetch(this.urlRest + "Acceso/Registrarse", {
        method: "POST",
        body: JSON.stringify({
          Name: Name,
          LestName: LestName,
          NameUser: NameUser,
          Email: Email,
          PasswordHash: PasswordHash,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "access-control-allow-origin": "*",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registro exitoso", data);
        return data;
      } else {
        console.error(`Error HTTP: ${response.status}`);
      }
    } catch (error) {
      console.log("Error en el registro:", error);
    }
  }

  // PELICULA
  // Get
  public async getMovies() {
    try {
      const response = await fetch(this.urlRest + "Peliculas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.token
        },
      });

      if (response.ok) {
        return response.json();
      } else {
        console.error(`Error HTTP: ${response.status}`);
      }
    } catch (error) {
      console.log("Error al obtener las películas:", error);
    }
  }

  // Post
  public async addMovie(titles: string, description: string, imagen: object) {
    try {
      const response = await fetch(this.urlRest + "Peliculas", {
        method: "POST",
        body: JSON.stringify({
          Titles: titles,
          Description: description,
          Imagen: imagen,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "access-control-allow-origin": "*",
          "Authorization": this.token
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Película agregada con éxito", data);
        return data;
      } else {
        console.error(`Error HTTP: ${response.status}`);
      }
    } catch (error) {
      console.log("Error al agregar la película:", error);
    }
  }

  // PUT
  public async editMovie(
    id: number,
    titles: string,
    description: string,
    imagen: string
  ) {
    try {
      const response = await fetch(`${this.urlRest}Peliculas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          titles: titles,
          description: description,
          imagen: imagen,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Película editada con éxito", data);
        return data;
      } else {
        console.error(`Error HTTP: ${response.status}`);
      }
    } catch (error) {
      console.log("Error al editar la película:", error);
      toast.error("Ocurrió un error al editar la película");
    }
  }

  // DELETE
  public async deletePost(id: number) {
    try {
      const response = await fetch(`${this.urlRest}Peliculas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Película eliminada con éxito");
      } else {
        console.error(`Error HTTP: ${response.status}`);
      }
    } catch (error) {
      console.log("Error al eliminar la película:", error);
      toast.error("Ocurrió un error al eliminar la película");
    }
  }
}
