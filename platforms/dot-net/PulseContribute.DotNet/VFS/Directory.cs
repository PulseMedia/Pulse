using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulseContribute.DotNet.VFS
{
    public static class Directory
    {

        public static void ExistsDirectory(string promiseId, string path)
        {
            try
            {
                Promise.Create(promiseId).Resolve(System.IO.Directory.Exists(path));
            }
            catch (Exception)
            {
                Promise.Create(promiseId).resolveFalse();
            }
        }

        public static void CreateDirectory(string promiseId, string path)
        {
            Promise.Create(promiseId).Resolve(
                Helper.TryActionOrFalse(() =>
                {
                    if (!System.IO.Directory.Exists(path))
                    {
                        System.IO.Directory.CreateDirectory(path);
                    }
                }
            ));
        }

        public static void DeleteDirectory(string promiseId, string path)
        {
            try
            {
                Promise.Create(promiseId).Resolve(Helper.TryActionOrFalse(() => {
                    if (System.IO.Directory.Exists(path))
                    {
                        System.IO.Directory.Delete(path);
                    }
                }));
            }
            catch (Exception)
            {
                Promise.Create(promiseId).resolveFalse();
            }
        }

        public static void ReadDirectory(string promiseId, string path)
        {
            List<string> files = new List<string>();
            List<string> dirs = new List<string>();
            
            try
            {
                if (System.IO.Directory.Exists(path))
                {
                    foreach (string file in System.IO.Directory.GetFiles(path))
                    {
                        files.Add(System.IO.Path.GetFileName(file));
                    }
                    foreach (string dir in System.IO.Directory.GetDirectories(path))
                    {
                        dirs.Add(new DirectoryInfo(dir).Name);
                    }
                }            
            } catch (Exception){}
            
            Promise.Create(promiseId).Resolve(new Dictionary<string, object>
            {
                { "dirs", dirs.ToArray() },
                { "files", files.ToArray() }
            });
        }

    }
}
