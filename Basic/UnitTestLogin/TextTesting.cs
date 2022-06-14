using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestLogin
{
    [TestClass]
    public class TextTesting
    {
        [TestMethod]
        public void InputTextSuccesful()
        {
            bool result = Basic.Program.InputString("Text");
            Assert.AreEqual(true, result);
        }


        [TestMethod]
        public void inputTextFail()
        {

            bool result = Basic.Program.InputString("TextLength");
            Assert.AreEqual(false, result);
        }
    }
}
