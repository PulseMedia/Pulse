using LibVLCSharp.Shared;
using LibVLCSharp.WinForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulseContribute.DotNet.WinForms
{
    public class Player: MediaPlayerApi
    {

        public static List<string> InitOptions = new List<string>()
        {
            "--no-keyboard-events",
            "--no-mouse-events"
        };

        public static List<string> VideoOptions = new List<string>()
        {
            ":video",
        };

        public static List<string> MusicOptions = new List<string>()
        {
            ":no-video",
        };

        public VideoView view;
        public LibVLC? LibVLCInstance;
        public MediaPlayer? MediaPlayer;

        public Player(VideoView videoView, Action onDone, Action onFailed)
        {
            view = videoView;

            //Load LibVLC in another thread
            //This can take a while - we dont want to get stuck in the SplashScreen
            new Thread(() =>
            {
                try
                {
                    LibVLCInstance = new LibVLC(InitOptions.ToArray());
                    MediaPlayer = new MediaPlayer(LibVLCInstance);
                } catch (Exception)
                {
                    Program.ExecuteOnMainThread(() =>
                    {
                        //Callback that the Player could not be initialized and cannot be used in the app
                        onFailed();
                    });
                    return;
                }
  

                Program.ExecuteOnMainThread(() =>
                {
                    //Only Accessible from MainThead
                    view.MediaPlayer = MediaPlayer;

                    //Callback that the Player is initialized and can be used in the app
                    onDone();
                });

            }).Start();
        }

        public void Play(string type, string playbackData)
        {
            MediaPlayer?.Stop();

            JsonObject playback = new JsonObject(playbackData);

            object[]? options = playback.OptJsonArray("options");

            if (playback.Has("url"))
            {
                Media media = new Media(LibVLCInstance!, new Uri(playback.OptString("url", "")));
                
                if(type == "VIDEO")
                {
                    VideoOptions.ForEach(opt => { media.AddOption(opt); });
                }
                if (type == "MUSIC")
                {
                    MusicOptions.ForEach(opt => { media.AddOption(opt); });
                }

                if(options != null)
                {
                    options.ToList<object>().ForEach(opt =>
                    {
                        if(opt is string)
                        {
                            string option = (string)opt;

                            if (option.StartsWith("--"))
                            {
                                option = option.Substring(2, option.Length - 2);
                            }
                            if (option.StartsWith("-"))
                            {
                                option = option.Substring(1, option.Length - 1);
                            }
                            if (!option.StartsWith(":"))
                            {
                                option = ":" + option;
                            }
                            media.AddOption(option);
                        }
                    });
                }

                media.AddOption(":network-caching=1000");
                media.AddOption(":rtsp-tcp");

                MediaPlayer!.Media = media;
                MediaPlayer?.Play();
                media.Dispose();
            }

        }

        public void Stop()
        {
            MediaPlayer?.Stop();
        }

        public void Pause()
        {
            MediaPlayer?.Pause();
        }

        public void Resume()
        {
            MediaPlayer?.Play();
        }

    }

    //Used internally to call player functions
    public interface MediaPlayerApi
    {

        void Play(string type, string playbackData);

        void Stop();

        void Pause();

        void Resume();

    }
}
