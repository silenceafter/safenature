using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace app.Server.Models;

public partial class OgtContext : DbContext
{
    public OgtContext()
    {
    }

    public OgtContext(DbContextOptions<OgtContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Drawing> Drawings { get; set; }

    public virtual DbSet<DrawingsTechnology> DrawingsTechnologies { get; set; }

    public virtual DbSet<DrawingsView> DrawingsViews { get; set; }

    public virtual DbSet<Material> Materials { get; set; }

    public virtual DbSet<MaterialsView> MaterialsViews { get; set; }

    public virtual DbSet<Operation> Operations { get; set; }

    public virtual DbSet<OperationsView> OperationsViews { get; set; }

    public virtual DbSet<TechnologiesOperation> TechnologiesOperations { get; set; }

    public virtual DbSet<Technology> Technologies { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("host=localhost;port=5432;database=OGT;username=postgres;password=bdw");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Drawing>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("drawings_pkey");

            entity.ToTable("drawings");

            entity.HasIndex(e => e.ExCode, "drawings_ex_code_key").IsUnique();

            entity.HasIndex(e => e.InCode, "drawings_in_code_key").IsUnique();

            entity.HasIndex(e => e.ExCode, "idx_drawings_ex_code");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ExCode)
                .HasMaxLength(20)
                .HasColumnName("ex_code");
            entity.Property(e => e.InCode)
                .HasMaxLength(20)
                .HasColumnName("in_code");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<DrawingsTechnology>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("drawings_technologies_pkey");

            entity.ToTable("drawings_technologies");

            entity.HasIndex(e => new { e.DrawingId, e.TechnologyId }, "drawing_id_technology_id").IsUnique();

            entity.HasIndex(e => e.DrawingId, "idx_drawings_technologies_drawing_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DrawingId).HasColumnName("drawing_id");
            entity.Property(e => e.TechnologyId).HasColumnName("technology_id");

            entity.HasOne(d => d.Drawing).WithMany(p => p.DrawingsTechnologies)
                .HasForeignKey(d => d.DrawingId)
                .HasConstraintName("fk_drawing");

            entity.HasOne(d => d.Technology).WithMany(p => p.DrawingsTechnologies)
                .HasForeignKey(d => d.TechnologyId)
                .HasConstraintName("fk_technology");
        });

        modelBuilder.Entity<DrawingsView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("drawings_view");

            entity.Property(e => e.Cnt).HasColumnName("cnt");
            entity.Property(e => e.ExCode)
                .HasMaxLength(20)
                .HasColumnName("ex_code");
            entity.Property(e => e.InCode)
                .HasMaxLength(20)
                .HasColumnName("in_code");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Material>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("materials_pkey");

            entity.ToTable("materials");

            entity.HasIndex(e => e.Code, "materials_code_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code)
                .HasMaxLength(7)
                .HasColumnName("code");
            entity.Property(e => e.DateInput).HasColumnName("date_input");
            entity.Property(e => e.DateOutput).HasColumnName("date_output");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<MaterialsView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("materials_view");

            entity.Property(e => e.Cnt).HasColumnName("cnt");
            entity.Property(e => e.Code)
                .HasMaxLength(7)
                .HasColumnName("code");
            entity.Property(e => e.DateInput).HasColumnName("date_input");
            entity.Property(e => e.DateOutput).HasColumnName("date_output");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Operation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("operations_pkey");

            entity.ToTable("operations");

            entity.HasIndex(e => e.Id, "idx_operations_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code)
                .HasMaxLength(45)
                .HasColumnName("code");
            entity.Property(e => e.Description)
                .HasColumnType("character varying")
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Type).HasColumnName("type");
        });

        modelBuilder.Entity<OperationsView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("operations_view");

            entity.Property(e => e.Cnt).HasColumnName("cnt");
            entity.Property(e => e.Code)
                .HasMaxLength(45)
                .HasColumnName("code");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<TechnologiesOperation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("technologies_operations_pkey");

            entity.ToTable("technologies_operations");

            entity.HasIndex(e => e.TechnologyId, "idx_technologies_operations_technology_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.OperationId).HasColumnName("operation_id");
            entity.Property(e => e.TechnologyId).HasColumnName("technology_id");

            entity.HasOne(d => d.Operation).WithMany(p => p.TechnologiesOperations)
                .HasForeignKey(d => d.OperationId)
                .HasConstraintName("fk_operation");

            entity.HasOne(d => d.Technology).WithMany(p => p.TechnologiesOperations)
                .HasForeignKey(d => d.TechnologyId)
                .HasConstraintName("fk_technology");
        });

        modelBuilder.Entity<Technology>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("technologies_pkey");

            entity.ToTable("technologies");

            entity.HasIndex(e => e.Id, "idx_technologies_technology_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code)
                .HasMaxLength(10)
                .HasColumnName("code");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
