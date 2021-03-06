namespace PulseContribute.DotNet.WinForms
{
    public class Program
    {
        //gets defined internally (after Constructor)
        public static Program Instance;

        //gets defined internally (before Constructor)
        //(Only access getter below to prevent overrides)
        public static string Prop_DefaultUserAgent = "";
        public static Action<Action>? Prop_ExecuteOnMainThread;

        //getter that can be used in the api
        public static Form Application { get { return Instance!.ApplicationForm; } }
        public static string UserAgent { get { return Prop_DefaultUserAgent; } }

        //gets defined in the constructor below
        public Form ApplicationForm;

        public Program(Form appForm)
        {
            ApplicationForm = appForm;

            //set values to the dependend project
            App.Prop_DefaultUserAgent = UserAgent;
        }

        //functions that can be used in the api
        public static void ExecuteOnMainThread(Action action)
        {
            Prop_ExecuteOnMainThread?.Invoke(action);
        }

    }
}