using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace app.Server.Models;

public partial class EcodbContext : DbContext
{
    public EcodbContext()
    {
    }

    public EcodbContext(DbContextOptions<EcodbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Acceptance> Acceptances { get; set; }

    public virtual DbSet<Discount> Discounts { get; set; }

    public virtual DbSet<HazardClass> HazardClasses { get; set; }

    public virtual DbSet<HazardousWaste> HazardousWastes { get; set; }

    public virtual DbSet<Partner> Partners { get; set; }

    public virtual DbSet<ReceivingDiscount> ReceivingDiscounts { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<TransactionType> TransactionTypes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("server=localhost;port=5432;database=ecodb;user id=postgres;password=bdw");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Acceptance>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("waste_disposal_pkey");

            entity.ToTable("acceptance");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("nextval('waste_disposal_id_seq'::regclass)")
                .HasColumnName("id");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.HazardousWasteId).HasColumnName("hazardous_waste_id");
            entity.Property(e => e.TransactionId).HasColumnName("transaction_id");

            entity.HasOne(d => d.HazardousWaste).WithMany(p => p.Acceptances)
                .HasForeignKey(d => d.HazardousWasteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("waste_disposal_hazardous_waste_id_fkey");

            entity.HasOne(d => d.Transaction).WithMany(p => p.Acceptances)
                .HasForeignKey(d => d.TransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("acceptance_transaction_id_fkey");
        });

        modelBuilder.Entity<Discount>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("discounts_in_stores_pkey");

            entity.ToTable("discounts");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("nextval('discounts_in_stores_id_seq'::regclass)")
                .HasColumnName("id");
            entity.Property(e => e.Bonuses).HasColumnName("bonuses");
            entity.Property(e => e.DateEnd).HasColumnName("date_end");
            entity.Property(e => e.DateStart).HasColumnName("date_start");
            entity.Property(e => e.PartnerId).HasColumnName("partner_id");
            entity.Property(e => e.Terms)
                .HasColumnType("character varying")
                .HasColumnName("terms");

            entity.HasOne(d => d.Partner).WithMany(p => p.Discounts)
                .HasForeignKey(d => d.PartnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("discounts_partner_id_fkey");
        });

        modelBuilder.Entity<HazardClass>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("hazard_class_pkey");

            entity.ToTable("hazard_class");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description)
                .HasColumnType("character varying")
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .HasColumnName("name");
        });

        modelBuilder.Entity<HazardousWaste>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("hazardous_waste_pkey");

            entity.ToTable("hazardous_waste");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Bonuses).HasColumnName("bonuses");
            entity.Property(e => e.HazardClassId).HasColumnName("hazard_class_id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");

            entity.HasOne(d => d.HazardClass).WithMany(p => p.HazardousWastes)
                .HasForeignKey(d => d.HazardClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("hazardous_waste_hazard_class_id_fkey");
        });

        modelBuilder.Entity<Partner>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("partners_pkey");

            entity.ToTable("partners");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description)
                .HasColumnType("character varying")
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<ReceivingDiscount>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("discounts_history_pkey");

            entity.ToTable("receiving_discounts");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("nextval('discounts_history_id_seq'::regclass)")
                .HasColumnName("id");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.DiscountId).HasColumnName("discount_id");
            entity.Property(e => e.TransactionId).HasColumnName("transaction_id");

            entity.HasOne(d => d.Discount).WithMany(p => p.ReceivingDiscounts)
                .HasForeignKey(d => d.DiscountId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("discounts_history_discount_id_fkey");

            entity.HasOne(d => d.Transaction).WithMany(p => p.ReceivingDiscounts)
                .HasForeignKey(d => d.TransactionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("receiving_discounts_transaction_id_fkey");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("roles_pkey");

            entity.ToTable("roles");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("transactions_pkey");

            entity.ToTable("transactions");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BonusesEnd).HasColumnName("bonuses_end");
            entity.Property(e => e.BonusesStart).HasColumnName("bonuses_start");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.TypeId).HasColumnName("type_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Type).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.TypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("transactions_type_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("transactions_user_id_fkey");
        });

        modelBuilder.Entity<TransactionType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("transaction_types_pkey");

            entity.ToTable("transaction_types");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Bonuses).HasColumnName("bonuses");
            entity.Property(e => e.RoleId).HasColumnName("role_id");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("users_role_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
