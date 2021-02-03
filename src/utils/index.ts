export const LOCAL_TITLE = '_title'

export const LOCAL_DATE = '_date'

export const LOCAL_BG = '_bgImg'


export const fileToBase64 = (file: File, callback: (base64: string) => void) => {
  const reader = new FileReader();
  // 传入一个参数对象即可得到基于该参数对象的文本内容
  reader.readAsDataURL(file);
  reader.onload = function (e: ProgressEvent<FileReader>) {
    // target.result 该属性表示目标对象的DataURL
    callback(e.target!.result as string)
  };
}
