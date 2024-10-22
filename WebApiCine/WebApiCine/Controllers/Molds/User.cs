namespace WebApiCine.Controllers.Molds
{
    public class User
    {
        [key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Name { get; set; }
        public string LestName { get; set; }
        

    }
}
