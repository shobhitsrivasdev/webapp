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
  source_ami    = "ami-0b6edd8449255b799"
  instance_type = "t2.micro"
  region        = "us-west-2"
  profile       = "dev"
  ssh_username  = "admin"
  ami_users = [
    "252513075420",
    "966862039609",
  ]
}
build {
  sources = [
    "source.amazon-ebs.debian"
  ]
  provisioner "shell" {
    scripts = [
      "./setup.sh",
    ]
  }
}



 