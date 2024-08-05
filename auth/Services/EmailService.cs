using System;
using System.Threading.Tasks;
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

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart("plain") { Text = message };

            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(_emailSettings.MailServer, _emailSettings.MailPort, _emailSettings.UseSsl);
                    await client.AuthenticateAsync(_emailSettings.UserName, _emailSettings.Password);
                    await client.SendAsync(emailMessage);
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                }
            }
        }
    }
}
