using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulseContribute.DotNet
{
    public class PromiseEvent
    {
        private string promiseId;

        public static Action<object, bool, string>? _promiseEventResolver;
        public static Action<string>? _promiseEventDisposer;

        public PromiseEvent(string promiseRequest)
        {
            promiseId = promiseRequest;
        }

        public void Trigger(object returnValue, bool isLastTrigger = false)
        {
            if (promiseId == "[UNDEFINED_EVENT]") { return; }
            _promiseEventResolver?.Invoke(returnValue, isLastTrigger, promiseId);
        }

        public void Dispose()
        {
            if (promiseId == "[UNDEFINED_EVENT]") { return; }
            _promiseEventDisposer?.Invoke(promiseId);
        }

    }

}
