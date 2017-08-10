using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheWorld.Services
{
    public class DebugMailService : IMailService
    {
        public void SendMail(string from, string to, string subject, string message)
        {
            Debug.WriteLine($"Sending email ... To:{to} From:{from} Subject:{subject} Message:{message}");
        }
    }
}
