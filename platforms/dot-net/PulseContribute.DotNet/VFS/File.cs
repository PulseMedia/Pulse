using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulseContribute.DotNet.VFS
{
    public static class File
    {
        public static void WriteFile(string promiseId, string path, string content)
        {
            Promise.Create(promiseId).Resolve(
                Helper.TryActionOrFalse(() =>
                {
                    System.IO.File.WriteAllText(path, content, Encoding.UTF8);
                }
            ));
        }

        public static void AppendFile(string promiseId, string path, string content)
        {
            Promise.Create(promiseId).Resolve(
                Helper.TryActionOrFalse(() =>
                {
                    System.IO.File.AppendAllText(path, content, Encoding.UTF8);
                }
            ));
        }

        public static void ReadFile(string promiseId, string path)
        {
            try
            {
                Promise.Create(promiseId).Resolve(System.IO.File.ReadAllText(path, Encoding.UTF8));
            }
            catch (Exception)
            {
                Promise.Create(promiseId).ResolveUndefined();
            }
        }

        public static void DeleteFile(string promiseId, string path)
        {
            try
            {
                Promise.Create(promiseId).Resolve((System.IO.File.Exists(path) && Helper.TryActionOrFalse(() => { System.IO.File.Delete(path); })));
            }
            catch (Exception)
            {
                Promise.Create(promiseId).resolveFalse();
            }
        }

        public static void ExistsFile(string promiseId, string path)
        {
            try
            {
                Promise.Create(promiseId).Resolve(System.IO.File.Exists(path));
            }
            catch (Exception)
            {
                Promise.Create(promiseId).resolveFalse();
            }
        }

    }
}
