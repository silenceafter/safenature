using app.Server.Services.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace app.Server.Services
{
    public class EncryptionService : IEncryptionService
    {
        private readonly IConfiguration _configuration;

        public EncryptionService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string Encrypt(string value)
        {
            using (Aes aesAlg = Aes.Create())
            {
                //генерация ключа
                /*string gkey = "";
                using (var rng = new RNGCryptoServiceProvider())
                {
                    byte[] key = new byte[32];
                    rng.GetBytes(key);
                    gkey = Convert.ToBase64String(key);
                }*/


                //string hh = _configuration["Encryption:Key"];
                byte[] keyBytes = Convert.FromBase64String(_configuration["Encryption:Key"]);
                aesAlg.Key = keyBytes;
                aesAlg.GenerateIV();

                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);
                using (MemoryStream msEncrypt = new MemoryStream())
                {
                    msEncrypt.Write(BitConverter.GetBytes(aesAlg.IV.Length), 0, sizeof(int));
                    msEncrypt.Write(aesAlg.IV, 0, aesAlg.IV.Length);

                    using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                        swEncrypt.Write(value);

                    return Convert.ToBase64String(msEncrypt.ToArray());
                }
            }
        }

        public string Decrypt(string value)
        {
            return "";
        }
    }
}
