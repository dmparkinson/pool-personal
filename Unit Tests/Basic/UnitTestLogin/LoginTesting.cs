using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestLogin
{
    [TestClass]
    public class LoginTesting
    {
 
        [TestMethod]
        public void InputLoginSuccesful()
        {
            bool result = Basic.Program.LoginUser("UserName", "12345");
            Assert.AreEqual(true, result);
        }


        [TestMethod]
        public void inputLoginFail()
        {
            bool result = Basic.Program.LoginUser("User", "12345");
            Assert.AreEqual(false, result);
        }
    }
}
