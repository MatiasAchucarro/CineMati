﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApiCine.Context;

#nullable disable

namespace WebApiCine.Migrations
{
    [DbContext(typeof(PeliculasContext))]
    partial class PeliculasContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WebApiCine.Controllers.Molds.Imagen", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Extension")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Value")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("Id");

                    b.ToTable("Imagen");
                });

            modelBuilder.Entity("WebApiCine.Controllers.Molds.Pelicula", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ImagenId")
                        .HasColumnType("int");

                    b.Property<string>("Titles")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ImagenId");

                    b.ToTable("Pelicula");
                });

            modelBuilder.Entity("WebApiCine.Controllers.Molds.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LestName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NameUser")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("URLFotoPerfilId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("URLFotoPerfilId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("WebApiCine.Controllers.Molds.Pelicula", b =>
                {
                    b.HasOne("WebApiCine.Controllers.Molds.Imagen", "Imagen")
                        .WithMany()
                        .HasForeignKey("ImagenId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Imagen");
                });

            modelBuilder.Entity("WebApiCine.Controllers.Molds.User", b =>
                {
                    b.HasOne("WebApiCine.Controllers.Molds.Imagen", "URLFotoPerfil")
                        .WithMany()
                        .HasForeignKey("URLFotoPerfilId");

                    b.Navigation("URLFotoPerfil");
                });
#pragma warning restore 612, 618
        }
    }
}
