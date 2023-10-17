packer {
  required_plugins {
    amazon = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/amazon"

    }
  }
}

source "amazon-ebs" "debian" {
  ami_name      = "Ami_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  source_ami    = env("SOURCE_AMI") || "ami-0b6edd8449255b799"
  instance_type = env("INSTANCE_TYPE") || "t2.micro"
  region        = env("REGION") || "us-west-2"
  profile       = env("PROFILE") || "dev"
  ssh_username  = env("SSH_USERNAME") || "admin"
  ami_users = split(",", env("AMI_USERS")) || [
    "252513075420",
    "966862039609",
  ]
}
build {
  sources = [
    "source.amazon-ebs.debian"
  ]
  provisioner "file" {
    source      = "webapp.zip"
    destination = "~/webapp.zip"
  }
  provisioner "shell" {
    scripts = [
      "./setup.sh",
    ]
  }
}



 