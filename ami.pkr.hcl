
variable "SOURCE_AMI" {
  type        = string
  default     = ""
  description = "Source AMI ID"
}

variable "INSTANCE_TYPE" {
  type        = string
  default     = ""
  description = "Instance Type for the AMI"
}

variable "REGION" {
  type        = string
  default     = ""
  description = "AWS Region"
}

variable "PROFILE" {
  type        = string
  default     = ""
  description = "AWS CLI profile name"
}

variable "SSH_USERNAME" {
  type        = string
  default     = ""
  description = "SSH Username to access the instance"
}

variable "AMI_USERS" {
  type        = string
  default     = ""
  description = "Comma-separated list of AWS Account IDs that will have access to the AMI"
}


packer {
  required_plugins {
    amazon = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/amazon"

    }
  }
}

source "amazon-ebs" "debian" {
  ami_name     = "Ami_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  source_ami   = var.SOURCE_AMI
  instance_type = var.INSTANCE_TYPE
  region       = var.REGION
  profile      = var.PROFILE
  ssh_username = var.SSH_USERNAME  # Make sure this value is being set
  ami_users    = split(",", var.AMI_USERS)
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



 