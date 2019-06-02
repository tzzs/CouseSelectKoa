import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
 
if __name__ == "__main__":
    data = pd.read_csv("course.csv",index_col="user")
    #获取X用户的评分
    X = data.ix["X"]
    X1 = X.copy()
    #中心化
    X1[X > 0] = X[X > 0] - np.mean(X[X > 0])
    #获取Y用户的评分
    Y = data.ix["Y"]
    Y1 = Y.copy()
    Y1[Y > 0] = Y[Y > 0] -np.mean(Y[Y > 0])
    #获取Z用户的评分
    Z = data.ix["Z"]
    Z1 = Z.copy()
    Z1[Z > 0] = Z[Z > 0] - np.mean(Z[Z > 0])
    #计算X和Y的相似度
    X_Y_sim = cosine_similarity(X1.values.reshape(1,-1),Y1.values.reshape(1,-1))
    #计算X和Z的相似度
    X_Z_sim = cosine_similarity(X1.values.reshape(1,-1),Z1.values.reshape(1,-1))
    #计算X对P7的评分
    X_P7 = (X_Y_sim * data.ix[1,6] + X_Z_sim * data.ix[2,6])/(X_Y_sim+X_Z_sim)
    print(X_P7)
    #[[ 4.23492502]]

import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import warnings
warnings.filterwarnings("ignore")
 
if __name__ == "__main__":
    data = pd.read_csv("G:/dataset/move.csv",index_col="music")  
    #定义一个去中心化的函数
    def f(x):
        temp = x.copy()
        #将大于0的相似度减去平均评分
        temp[temp > 0] = x[x > 0] - np.mean(x[x>0])
        return temp
    #将去中心化函数应用到每一行数据中
    data = data.apply(f,axis=1)
    #计算M5与其他音乐之间的相似度
    M1_M5_sim = cosine_similarity(data.ix[0,:],data.ix[4,:])#[[ 0.98198051]]
    M2_M5_sim = cosine_similarity(data.ix[1,:],data.ix[4,:])#[[ 0.]]
    M3_M5_sim = cosine_similarity(data.ix[2,:],data.ix[4,:])#[[ 0.72057669]]
    M4_M5_sim = cosine_similarity(data.ix[3,:],data.ix[4,:])#[[ 0.]]
    #选择与M5相似度最高的M1和M3来计算U3对M5的评分
    U3_M5 = (M1_M5_sim * 4 + M3_M5_sim * 5)/(M1_M5_sim + M3_M5_sim)
    print(U3_M5)#[[ 4.423232]]D