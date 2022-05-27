using System.Runtime.InteropServices;

namespace PulseContribute.DotNet.WinForms
{
    [ComVisible(true)]
    public class ApiMap
    {
        [ComVisible(false)]
        public static String PlatformApiMap()
        {
            return JSON.Stringify(new Dictionary<string, string>
            {
                { "WRITE_FILE", "WriteFile" },
                { "APPEND_FILE", "AppendFile" },
                { "READ_FILE", "ReadFile" },
                { "DELETE_FILE", "DeleteFile" },
                { "EXISTS_FILE", "ExistsFile" },

                { "FETCH", "AsyncFetch" }
            });
        }

        #region VFS.File

        public void WriteFile(string promiseId, string path, string content){ VFS.File.WriteFile(promiseId, path, content); }

        public void AppendFile(string promiseId, string path, string content) { VFS.File.AppendFile(promiseId, path, content); }

        public void ReadFile(string promiseId, string path) { VFS.File.ReadFile(promiseId, path); }

        public void DeleteFile(string promiseId, string path) { VFS.File.DeleteFile(promiseId, path); }

        public void ExistsFile(string promiseId, string path) { VFS.File.ExistsFile(promiseId, path); }

        #endregion

        #region NET.Web

        public void AsyncFetch(string promiseId, string url, string options) { Net.Web.AsyncInternalFetch(promiseId, url, options); }

        #endregion
    }
}
