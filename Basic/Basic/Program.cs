using System;

namespace Basic
{
    public class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
        public static bool LoginUser(string user, string password) {
            if (user == "UserName" && password == "12345")
            {
                return true;
            }
            else { return false; }
        }


        public static bool InputString(string text)
        {
            if (text.Length < 6)
            {
                return true;
            }
            else { return false; }
        }
    }
}
