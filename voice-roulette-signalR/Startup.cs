using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using voice_roulette_signalR.Hubs;
using voice_roulette_signalR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace voice_roulette_signalR
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    x => x.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });


            services.AddSignalR();
            services.AddSingleton<List<User>>();
            services.AddSingleton<List<UserCall>>();
            services.AddSingleton<List<CallOffer>>();
           // services.AddMvcCore().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
         
          

           

           
            app.UseStaticFiles();
            
            app.UseDeveloperExceptionPage();
            app.UseHttpsRedirection();
            app.UseFileServer();
            app.UseCors("CorsPolicy");
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute( name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapHub<ConnectionHub>("ConnectionHub", options =>
                {
                    options.Transports = Microsoft.AspNetCore.Http.Connections.HttpTransportType.WebSockets;
                });
                //endpoints.MapHub<ConnectionHub>("RouletteConnectionHub", options =>
                //{
                //    options.Transports = Microsoft.AspNetCore.Http.Connections.HttpTransportType.WebSockets;
                //});
            });
        }
    }
}
