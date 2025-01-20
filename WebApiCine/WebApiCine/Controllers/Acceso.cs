using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiCine.Services;
using WebApiCine.Controllers.Molds;
using WebApiCine.Dto;
using Microsoft.AspNetCore.Authorization;
using WebApiCine.Context;

namespace WebApiCine.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class Acceso : ControllerBase
    {
        private readonly PeliculasContext _dbPruenbaContext;
        private readonly Tools _tools;
        public Acceso(PeliculasContext dbPruebaContext, Tools tools)
        {
            _dbPruenbaContext = dbPruebaContext;
            _tools = tools;
        }


        [HttpGet]
        [Route("GetUsuario/{id}")]
        public async Task<IActionResult> GetUsuario(int id)
        {
            var usuario = await _dbPruenbaContext.User
                .Where(u => u.Id == id)
                .Select(u => new
                {
                    u.Id,
                    u.Name,
                    u.LestName,
                    u.NameUser,
                    u.Email
                })
                .FirstOrDefaultAsync();

            if (usuario == null)
                return StatusCode(StatusCodes.Status404NotFound, new { isSuccess = false, message = "Usuario no encontrado" });

            return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, usuario });
        }

        [HttpPost]
        [Route("Registrarse")]
        public async Task<IActionResult>Registrarse(UserInput objeto)
        {
            var usuarioExistente = await _dbPruenbaContext.User
        .AnyAsync(u => u.Email == objeto.Email || u.NameUser == objeto.NameUser);

            if (usuarioExistente)
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                    new { isSuccess = false, message = "El email o nombre de usuario ya está registrado" });
            }
            var modeloUsuario = new User
            {
                Name =  objeto.Name,
                LestName = objeto.LestName,
                NameUser = objeto.NameUser,
                Email = objeto.Email,
                PasswordHash = _tools.encriptarSHA256(objeto.PasswordHash),
            };
            await _dbPruenbaContext.User.AddAsync(modeloUsuario);
            await _dbPruenbaContext.SaveChangesAsync();
            if (modeloUsuario.Id != 0)
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true });
            else
                return StatusCode(StatusCodes.Status400BadRequest, new { isSuccess = false, message = "Error al registrar usuario" });
        }
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult>Login(LoginDTO objeto) 
        {
            var usuarioEncontrado = await _dbPruenbaContext.User
                .Where(u => (
                      u.Email == objeto.Email ||
                      u.NameUser == objeto.NameUser) &&
                      u.PasswordHash == _tools.encriptarSHA256(objeto.PasswordHash)).FirstOrDefaultAsync();
            if (usuarioEncontrado == null)
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, token = "" });
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, token = _tools.generarJWT(usuarioEncontrado)});
        }
    }
}
