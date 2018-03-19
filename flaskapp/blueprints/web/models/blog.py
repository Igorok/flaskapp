from flaskapp.blueprints.web.models.index import Model
from flaskapp.blueprints.web.models.user import UserModel
from datetime import datetime, timedelta


class BlogItem (Model):
    id = 0
    user_id = ''
    title = ''
    text = ''
    date = ''

    # create blog item
    def __init__(self, **kwargs):
        self.id = kwargs['id'] if 'id' in kwargs else None
        self.user_id = kwargs['user_id'] if 'user_id' in kwargs else None
        self.title = str(kwargs['title']).strip() if 'title' in kwargs else ''
        self.text = str(kwargs['text']).strip() if 'text' in kwargs else ''

        if 'date' in kwargs:
            self.date = str(kwargs['date']).strip()
        else:
            self.date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # validate item
    def validate (self, **kwargs):
        __wrongFields = []

        if (self.user_id == None):
            __wrongFields.append('user_id')
        
        if (self.title == None or len(self.title) == 0):
            __wrongFields.append('title')
        
        if (self.text == None or len(self.text) == 0):
            __wrongFields.append('text')

        if (len(__wrongFields) > 0):
            raise Exception('Wrong fields ' + ', '.join(__wrongFields))


class BlogModel (Model):
    TABLE = 'blog'

    def addBlog(self, *args, **kwargs):
        uModel = UserModel()
        # check authentication and get data of current user
        profile_dict = uModel.getUserByToken(**kwargs)

        blogItem = BlogItem(
            title = kwargs['title'],
            text = kwargs['text'],
            user_id = profile_dict['id']
        )
        blogItem.validate()

        sql = '''insert into "{0}" 
            ("title", "text", "user_id", "date") 
            values (%s, %s, %s, %s)
            returning id
            ;'''.format(self.TABLE)
        
        connection = self.connect_postgres()
        cursor = connection.cursor()
        ids = cursor.execute(sql, [blogItem.title, blogItem.text, blogItem.user_id, blogItem.date])
        connection.commit()
        connection.close()
        
        blogItem.id = ids

        return blogItem.__dict__

    def getBlog (self):
        blog = BlogItem()
        print('blog item', blog)
