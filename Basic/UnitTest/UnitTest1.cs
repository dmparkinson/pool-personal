using Microsoft.VisualStudio.TestTools.UnitTesting;


namespace UnitTest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestSuccesful()
        {
            bool result = Basic.Program.LoginUser("UserName","12345");
            Assert.AreEqual(true, result);
        }


        [TestMethod]
        public void TestFail()
        {
            bool result = Basic.Program.LoginUser("UserName", "12345");
            Assert.AreEqual(false, result);
        }


    }
}
