using System;
using System.Threading.Tasks;
using auth.Data;
using auth.DTOs;
using auth.Models;
using auth.Services.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace auth.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;
        private readonly string _mailServer;
        private readonly int _mailPort;
        private readonly string _senderName;
        private readonly string _senderEmail;
        private readonly string _userName;
        private readonly string _password;
        private readonly bool _useSsl;

        public EmailService(IConfiguration configuration)
        {
            _mailServer = configuration["MailServer"];
            _mailPort = int.TryParse(configuration["MailPort"], out var _mailPortResult) ? _mailPortResult : -1;
            _senderName = configuration["SenderName"];
            _senderEmail = configuration["SenderEmail"];
            _userName = configuration["UserName"];
            _password = configuration["Password"];
            _useSsl = bool.TryParse(configuration["UseSsl"], out bool _useSslResult) ? _useSslResult : false;
        }

        public async Task<DefaultResult> SendEmailAsync(string email, string subject, string message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_senderName, _senderEmail));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart("plain") { Text = message };
            //
            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(_mailServer, _mailPort, _useSsl);
                    await client.AuthenticateAsync(_userName, _password);
                    await client.SendAsync(emailMessage);
                    return new DefaultResult()
                    {
                        IsSuccessful = true,
                        Message = $"Письмо успешно отправлено на адрес {email}",
                        Exception = null
                    };
                }
                catch (Exception ex)
                {
                    return new DefaultResult()
                    {
                        IsSuccessful = false,
                        Message = $"Не удалось отправить email на почту {email}",
                        Exception = ex
                    };
                }
                finally
                {
                    await client.DisconnectAsync(true);
                }
            }
        }
    }
}
