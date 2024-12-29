namespace WebApiCine.Controllers.Molds
{
    public class User
    {
        [key]
        public int IdUser { get; set; }
        public string Email { get; set; } = null;
        public string  PasswordHash { get; set; } = null;
        public string Name { get; set; } = null!;
        public string LestName { get; set; } = null;
        public string NameUser { get; set; } = null;

        public Imagen URLFotoPerfil { get; set; }

    }
}
