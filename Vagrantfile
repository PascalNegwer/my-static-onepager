$script = <<SCRIPT
npm install -g npm
SCRIPT

# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    config.vm.box = "scotch/box-pro-nginx"
    config.vm.hostname = "scotchbox"
    config.vm.network "forwarded_port", guest: 80, host: 8080
    config.vm.network "private_network", ip: "192.168.33.10"
    config.vm.synced_folder ".", "/var/www/", :mount_options => ["dmode=777", "fmode=777"]
    config.vm.provision "shell", inline: $script

    config.vm.provider :virtualbox do |vb|
            host = RbConfig::CONFIG['host_os']

            if host =~ /darwin/
                cpus = `sysctl -n hw.ncpu`.to_i
                mem = `sysctl -n hw.memsize`.to_i / 1024 / 1024 / 4

            elsif host =~ /linux/
                cpus = `nproc`.to_i
                mem = `grep 'MemTotal' /proc/meminfo | sed -e 's/MemTotal://' -e 's/ kB//'`.to_i / 1024 / 4

            # Windows...
            else
                cpus = 4
                mem = 4096
            end

            vb.customize ["modifyvm", :id, "--memory", mem]
            vb.customize ["modifyvm", :id, "--cpus", cpus]
        end
end