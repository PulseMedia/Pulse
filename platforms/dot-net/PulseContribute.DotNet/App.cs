using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulseContribute.DotNet
{
    public static class App
    {

        //gets defined internally
        //(Only access getter below to prevent overrides)
        public static string Prop_DefaultUserAgent = "";

        //getter that can be used in the api
        public static string UserAgent { get { return Prop_DefaultUserAgent; } }

    }
}
