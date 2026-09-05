using KuwaitMoving.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Register Data Service as Singleton for in-memory persistence
builder.Services.AddSingleton<IDataService, DataService>();

// Enable CORS for Angular client
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClient", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAngularClient");

// Fallback or root health check
app.MapGet("/", () => Results.Ok(new
{
    service = "Kuwait Furniture Moving & Assembly API",
    phone = "60055108",
    international = "+96560055108",
    status = "Online",
    version = "1.0.0",
    docs = "/openapi/v1.json"
}));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
