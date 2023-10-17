
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
  ami_name      = "Ami_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  source_ami    = var.SOURCE_AMI != null ? var.SOURCE_AMI : "ami-0b6edd8449255b799"
  instance_type = var.INSTANCE_TYPE != null ? var.INSTANCE_TYPE : "t2.micro"
  region        = var.REGION != null ? var.REGION : "us-west-2"
  profile       = var.PROFILE != null ? var.PROFILE : "dev"
  ssh_username  = var.SSH_USERNAME != null ? var.SSH_USERNAME : "admin"
  ami_users     = var.AMI_USERS != null ? split(",", var.AMI_USERS) : ["252513075420", "966862039609"]
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



 