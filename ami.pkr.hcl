
variable "SOURCE_AMI" {
  type        = string
  default     = "ami-0b6edd8449255b799"
  description = "Source AMI ID"
}

variable "INSTANCE_TYPE" {
  type        = string
  default     = "t2.micro"
  description = "Instance Type for the AMI"
}

variable "REGION" {
  type        = string
  default     = "us-west-2"
  description = "AWS Region"
}

variable "PROFILE" {
  type        = string
  default     = "dev"
  description = "AWS CLI profile name"
}

variable "SSH_USERNAME" {
  type        = string
  default     = "admin"
  description = "SSH Username to access the instance"
}

variable "AMI_USERS" {
  type        = string
  default     = "252513075420,966862039609"
  description = "Comma-separated list of AWS Account IDs that will have access to the AMI"
}
variable "OS_NAME" {
  type        = string
  default     = "debian-12-amd64-*"
  description = "Comma-separated list of AWS Account IDs that will have access to the AMI"
}

variable "OS_ROOT_TYPE" {
  type        = string
  default     = "ebs"
  description = "Comma-separated list of AWS Account IDs that will have access to the AMI"
}

variable "OS_VER" {
  type        = string
  default     = "hvm"
  description = "Comma-separated list of AWS Account IDs that will have access to the AMI"
}
variable "DEVICE_NAME" {
  type        = string
  default     = "/dev/xvda"
  description = "Comma-separated list of AWS Account IDs that will have access to the AMI"
}
variable "VOLUME_SIZE" {
  type        = string
  default     = "25"
  description = "Comma-separated list of AWS Account IDs that will have access to the AMI"
}
variable "VOLUME_TYPE" {
  type        = string
  default     = "gp2"
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
  ami_name = "Ami_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  source_ami_filter {
    filters = {
      name                = "${var.OS_NAME}"
      root-device-type    = "${var.OS_ROOT_TYPE}"
      virtualization-type = "${var.OS_VER}"
    }
    most_recent = true
    owners      = ["amazon"]
  }
  instance_type = var.INSTANCE_TYPE
  region        = var.REGION
  profile       = var.PROFILE
  ssh_username  = var.SSH_USERNAME
  ami_users     = split(",", var.AMI_USERS)

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = var.DEVICE_NAME
    volume_size           = var.VOLUME_SIZE
    volume_type           = var.VOLUME_TYPE
  }
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




