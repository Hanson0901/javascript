from flask import Flask, render_template,request
app=Flask(__name__)
@app.route('/',methods=['POST','GET'])
def index():
    if request.method =='POST':
        if request.values['send']=='送出':
            return render_template('reg0.html',user=request.values['user'])
        return render_template('reg0.html',user="")
    if __name__=="__main__":
        app.run(host='0,0,0,0',port='8080',debug=True)