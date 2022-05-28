using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulseContribute.DotNet
{
    public static class App
    {

        //gets defined by the Project dependent on this project
        //(Only access getter below to prevent overrides)
        public static string Prop_DefaultUserAgent = "";
        public static Action<Action>? Prop_ExecuteOnMainThread;

        //getter that can be used in the api
        public static string UserAgent { get { return Prop_DefaultUserAgent; } }

        //functions that can be used in the api
        public static void ExecuteOnMainThread(Action action)
        {
            Prop_ExecuteOnMainThread?.Invoke(action);
        }

    }
}
