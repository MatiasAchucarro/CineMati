using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;

namespace WebApiCine.Dto
{
    public class LoginDTO
    {
        public string Email { get; set; }
        public string NameUser { get; set; }
        public string PasswordHash { get; set; }
    }
}
