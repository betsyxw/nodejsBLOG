#shell脚本
#!/bin/sh
cd file_name_path
cd access.log $(date + %Y-%m-%d-%H).access.log
#元access.log文件清空
echo ""> access.log