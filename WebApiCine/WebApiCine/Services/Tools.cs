using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebApiCine.Context;
using WebApiCine.Controllers.Molds;

namespace WebApiCine.Services
{
    public class Tools
    {
       private readonly IConfiguration _configuration;
        public Tools(IConfiguration configuration)

        {
            _configuration = configuration; 
        }

        public string encriptarSHA256(string texto)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(texto));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
        public string generarJWT(User user)
        {
            var userClaims = new[]
            {
              new Claim(ClaimTypes.NameIdentifier, user.IdUser.ToString()),
              new Claim(ClaimTypes.Email, user.Email),
              new Claim(ClaimTypes.Name, user.Name.ToString()),
              new Claim(ClaimTypes.Surname, user.LestName.ToString()),
          };

          var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);


            var jwtConfig = new JwtSecurityToken(

                claims: userClaims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(jwtConfig);

        }
    }
}
