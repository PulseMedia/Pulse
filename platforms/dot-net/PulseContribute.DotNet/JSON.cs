using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulseContribute.DotNet
{
    public static class JSON
    {
        public static object Parse(string json)
        {
            if (json == null || json.Length == 0)
            {
                return new Dictionary<string, object>();
            }
            return toObject(JToken.Parse(json));
        }

        public static string Stringify(object obj)
        {
            if (obj is Array)
            {
                return ((JArray)JToken.FromObject(obj)).ToString();
            }
            return ((JObject)JToken.FromObject(obj)).ToString();
        }

        private static object toObject(JToken token)
        {
            switch (token.Type)
            {
                case JTokenType.Object:
                    return token.Children<JProperty>()
                                .ToDictionary(prop => prop.Name,
                                              prop => toObject(prop.Value));

                case JTokenType.Array:
                    return token.Select(toObject).ToList();

                default:
                    return ((JValue)token).Value;
            }
        }

    }

    public class JsonObject
    {
        private Dictionary<string, object> data;

        public Dictionary<string, object> raw
        {
            get { return data; }
        }
        public JsonObject(string json)
        {
            data = (Dictionary<string, object>)JSON.Parse(json);
        }

        private JsonObject()
        {
            this.data = new Dictionary<string,object>();
        }

        public string OptString(string key, string fallback)
        {
            if(data.TryGetValue(key, out object value))
            {
                if(value is string)
                {
                    return (string)value;
                }
                return fallback;
            }
            return fallback;
        }

        public bool OptBoolean(string key, bool fallback)
        {
            if (data.TryGetValue(key, out object value))
            {
                if (value is bool)
                {
                    return (bool)value;
                }
                return fallback;
            }
            return fallback;
        }

        public int OptInt(string key, int fallback)
        {
            if (data.TryGetValue(key, out object value))
            {
                if (value is int)
                {
                    return (int)value;
                }
                return fallback;
            }
            return fallback;
        }

        public double OptDouble(string key, double fallback)
        {
            if (data.TryGetValue(key, out object value))
            {
                if (value is double)
                {
                    return (double)value;
                }
                return fallback;
            }
            return fallback;
        }

        public int OptDouble(string key, int fallback)
        {
            if (data.TryGetValue(key, out object value))
            {
                if (value is int)
                {
                    return (int)value;
                }
                return fallback;
            }
            return fallback;
        }

        public long OptLong(string key, long fallback)
        {
            if (data.TryGetValue(key, out object value))
            {
                if (value is long)
                {
                    return (long)value;
                }
                return fallback;
            }
            return fallback;
        }

        public JsonObject OptJsonObject(string key)
        {
            if (data.TryGetValue(key, out object value))
            {
                if (value is Dictionary<string, object>)
                {
                    return new JsonObject()
                    {
                        data = (Dictionary<string,object>)value
                    };
                }
                return null;
            }
            return null;
        }

    }
}
