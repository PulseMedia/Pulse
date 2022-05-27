using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulseContribute.DotNet
{
    public class Promise
    {
        private string promiseId;

        public static Action<object, string>? _promiseResolver;
        public static Action<string>? _promiseUndefinedResolver;
        public static Action<string, object, string>? _promiseObjectResolver;
        public static Action<string, string, string>? _promiseException;

        public Promise(string promiseRequest)
        {
            promiseId = promiseRequest;
        }

        public static Promise Create(string promiseRequest)
        {
            return new Promise(promiseRequest);
        }

        public void Resolve(object returnValue)
        {
            _promiseResolver?.Invoke(returnValue, promiseId);
        }

        public void ResolveUndefined()
        {
            _promiseUndefinedResolver?.Invoke(promiseId);
        }

        public void ResolveTrue()
        {
            Resolve(true);
        }

        public void resolveFalse()
        {
            Resolve(false);
        }

        public void ResolveObject(string type, object returnValue)
        {
            _promiseObjectResolver?.Invoke(type, returnValue, promiseId);
        }

        public void Exception(string name, string message)
        {
            _promiseException?.Invoke("Native: " + name, message, promiseId);
        }

    }
}
