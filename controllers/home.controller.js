const db = require('../common/database');

//* GET Home. */
module.exports.getHome= function(req, res) {
    return new Promise(function(resolve, reject) {
        try {
        const menu = 'SELECT typenews.type_id,typenews.category_id,slugC, name, GROUP_CONCAT(DISTINCT type_name) type_name, slugT  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories  on categories.category_id = typenews.category_id group by name';
        db.query(menu, function(err, nav, fields){
            if(err){
                return reject(err);
            }else{
                const slide = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id  WHERE posts.isactive = 1 ORDER BY publish_date DESC LIMIT 6';
                db.query(slide, function(err, slidepost, fields){
                    if(err){
                        return reject(err);
                    }else{
                       const  popularPostQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id  WHERE posts.isactive = 1 ORDER BY views_count  DESC LIMIT 9';
                       db.query(popularPostQ, function(err, popularPost, fields){
                           if(err){
                                return reject(err);
                           }else{
                               const mostPopularQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id  WHERE posts.isactive = 1 ORDER BY publish_date DESC LIMIT 4';
                               db.query(mostPopularQ, function(err, mostPopular, fields){
                                if(err){
                                    return reject(err);
                                    }else{
                                       const mostReaderQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id  WHERE posts.isactive = 1 ORDER BY views_count DESC LIMIT 4';
                                       db.query(mostReaderQ, function(err, mostReader, fields){
                                        if(err){
                                            return reject(err);
                                         }else{
                                            const giaiTriQ = 'SELECT * FROM posts inner join typenews on posts.type_id = typenews.type_id inner join categories on categories.category_id =  typenews.category_id where  categories.category_id = 1 and posts.isactive = 1';
                                            db.query(giaiTriQ, function(err, giaiTri, fields){
                                                if(err){
                                                    return reject(err);
                                                }else{
                                                    const evaTamQ = 'SELECT * FROM posts inner join typenews on posts.type_id = typenews.type_id inner join categories on categories.category_id =  typenews.category_id where  categories.category_id = 2 and posts.isactive = 1';
                                                    db.query(evaTamQ, function(err, evaTam, fields){
                                                        if(err){
                                                            return reject(err);
                                                        }else{
                                                            if(err){
                                                                return reject(err);
                                                            }else{
                                                                const thoiTrangQ = 'SELECT * FROM posts inner join typenews on posts.type_id = typenews.type_id inner join categories on categories.category_id =  typenews.category_id where  categories.category_id = 3 and posts.isactive = 1';
                                                                db.query(thoiTrangQ, function(err, thoiTrang, fields){
                                                                    if(err){
                                                                        return reject(err);
                                                                    }else{
                                                                        const depQ = 'SELECT * FROM posts inner join typenews on posts.type_id = typenews.type_id inner join categories on categories.category_id =  typenews.category_id where  categories.category_id = 4 and posts.isactive = 1';
                                                                        db.query(depQ, function(err, dep, fields){
                                                                            if(err){
                                                                                return reject(err);
                                                                            }else{
                                                                                const giaDinhQ = 'SELECT * FROM posts inner join typenews on posts.type_id = typenews.type_id inner join categories on categories.category_id =  typenews.category_id where  categories.category_id = 5 and posts.isactive = 1';
                                                                                db.query(giaDinhQ, function(err, giaDinh, fields){
                                                                                    if(err){
                                                                                        return reject(err);
                                                                                    }else{
                                                                                        const sucKhoeQ = 'SELECT * FROM posts inner join typenews on posts.type_id = typenews.type_id inner join categories on categories.category_id =  typenews.category_id where  categories.category_id = 6 and posts.isactive = 1';
                                                                                        db.query(sucKhoeQ, function(err, suckhoe, fields){
                                                                                            if(err){
                                                                                                return reject(err);
                                                                                            }else{
                                                                                                const amThucQ = 'SELECT * FROM posts inner join typenews on posts.type_id = typenews.type_id inner join categories on categories.category_id =  typenews.category_id where  categories.category_id = 7 and posts.isactive = 1';
                                                                                                db.query(amThucQ, function(err, amThuc, fields){
                                                                                                    if(err){
                                                                                                        return reject(err);
                                                                                                    }else{
                                                                                                        const tinTucQ = 'SELECT * FROM posts inner join typenews on posts.type_id = typenews.type_id inner join categories on categories.category_id =  typenews.category_id where  categories.category_id = 8 and posts.isactive = 1';
                                                                                                         db.query(tinTucQ, function(err, tinTuc, fields){
                                                                                                            if(err){
                                                                                                                return reject(err);
                                                                                                            }else{
                                                                                                                const kinhNghiemQ = 'SELECT * FROM posts inner join typenews on posts.type_id = typenews.type_id inner join categories on categories.category_id =  typenews.category_id where  categories.category_id = 9 and posts.isactive = 1';
                                                                                                                db.query(kinhNghiemQ, function(err, kinhNghiem, fields){
                                                                                                                    if(err){
                                                                                                                        return reject(err);
                                                                                                                    }else{
                                                                                                                        const getTagQ = 'Select DISTINCT tags, slug_tag from tags';
                                                                                                                        db.query(getTagQ, function(err, gettag, fields){
                                                                                                                            if(err){
                                                                                                                                return reject(err);
                                                                                                                            }else{
                                                                                                                                resolve({
                                                                                                                                    nav:nav,
                                                                                                                                       slidepost: slidepost,
                                                                                                                                       popularPost:popularPost,
                                                                                                                                       mostPopular:mostPopular,
                                                                                                                                       mostReader:mostReader,
                                                                                                                                       giaiTri:giaiTri,
                                                                                                                                       evaTam:evaTam,
                                                                                                                                       thoiTrang:thoiTrang,
                                                                                                                                       dep:dep,
                                                                                                                                       giaDinh:giaDinh,
                                                                                                                                       suckhoe:suckhoe,
                                                                                                                                       amThuc:amThuc,
                                                                                                                                       tinTuc:tinTuc,
                                                                                                                                       kinhNghiem:kinhNghiem,
                                                                                                                                       gettag:gettag
                                                                                                                                   });
                                                                                                                                   let data = {
                                                                                                                                       nav:nav,
                                                                                                                                       slidepost: slidepost,
                                                                                                                                       popularPost:popularPost,
                                                                                                                                       mostPopular:mostPopular,
                                                                                                                                       mostReader:mostReader,
                                                                                                                                       giaiTri:giaiTri,
                                                                                                                                       evaTam:evaTam,
                                                                                                                                       thoiTrang:thoiTrang,
                                                                                                                                       dep:dep,
                                                                                                                                       giaDinh:giaDinh,
                                                                                                                                       sucKhoe:suckhoe,
                                                                                                                                       amThuc:amThuc,
                                                                                                                                       tinTuc:tinTuc,
                                                                                                                                       kinhNghiem:kinhNghiem,
                                                                                                                                       gettag:gettag
                                                                                                                                   }
                                                                                                                                   res.render('pages/home', {
                                                                                                                                       data:data
                                                                                                                                   });
                                                                                                                                    console.log(data.gettag.length);
                                                                                                                            }
                                                                                                                        })
                                                                                                                    }

                                                                                                                });
                                                                                                            }

                                                                                                         });
                                                                                                    }
                                                                                                });
                                                                                            }

                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                        });
                                                                    }

                                                                });
                                                            }
                                                        }
                                                    });

                                                }
                                            });       
                                        }

                                       });
                                    }
                               });
                           }

                       });

                    }
                })
            } 
        });
    } catch (err) {
        reject(err);
    }
    });
};

//* GET Detail. */
module.exports.getDetail = function(req, res) {
  let slugT = req.params.slugT;
  let slug = req.params.slug;
  return new Promise(function(resolve, reject) {
    try {
        const result = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id  WHERE  posts.isactive = 1 and  slugT = "' + slugT + '" and slug = "' + slug + '"  ';
        db.query(result, function(err, post, fields){
            if (err) {
                return reject(err);
            } else{
               const relatedPostQ = 'SELECT * FROM posts right join typenews on typenews.type_id = posts.type_id WHERE posts.isactive = 1 and  slugT = "' + slugT + '" AND  slugT != "' + slugT + '"';
               db.query(relatedPostQ, function(err, relatedPost, fields){
                if (err) {
                    return reject(err);
                }else{
                    const menuQ = 'SELECT typenews.type_id,typenews.category_id,slugC, name, GROUP_CONCAT(DISTINCT type_name) type_name, GROUP_CONCAT(DISTINCT slugT) slugT  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories  on categories.category_id = typenews.category_id group by name';
                    db.query(menuQ, function(err, nav, fields){
                        if (err) {
                            return reject(err);
                        }else{
                            const  popularPostQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where  posts.isactive = 1 ORDER BY views_count DESC LIMIT 9';
                            db.query(popularPostQ, function(err, popularPost, fields){
                                if (err) {
                                    return reject(err);
                                }else{
                                    const mostReaderQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where  posts.isactive = 1 ORDER BY views_count DESC LIMIT 4';
                                    db.query(mostReaderQ, function(err, mostReader, fields) {
                                        if (err) {
                                            return reject(err);
                                        }else{
                                            const mostPopularQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where  posts.isactive = 1 ORDER BY publish_date DESC LIMIT 4';
                                            db.query(mostPopularQ, function (err, mostPopular, fields) {
                                                if (err) {
                                                    return reject(err);
                                                }else{
                                                    const tagQ = 'SELECT post_id, GROUP_CONCAT(DISTINCT tags) tag, slug_tag, slug FROM tags GROUP BY post_id  Having  slug = "' + slug + '" ';
                                                    db.query(tagQ, function (err, tags, fields) {
                                                        if (err) {
                                                            return reject(err);
                                                        }else{
                                                            const getTagQ = 'Select DISTINCT tags, slug_tag from tags';
                                                            db.query(getTagQ, function(err, gettag, fields){
                                                                resolve({
                                                                    post: post.rows,
                                                                    relatedPost:relatedPost,
                                                                    nav:nav,
                                                                    popularPost:popularPost,
                                                                    mostPopular:mostPopular,
                                                                    mostReader:mostReader,
                                                                    tags:tags,
                                                                    gettag:gettag
                                                                })
                                                             
                                                                let data = {
                                                                    post: post,
                                                                    relatedPost:relatedPost,
                                                                    nav:nav,
                                                                    popularPost:popularPost,
                                                                    mostPopular:mostPopular,
                                                                    mostReader:mostReader,
                                                                    tags:tags,
                                                                    gettag:gettag,
                                                                   
                                                                }
                                                               
                                                                res.render('pages/detail', {
                                                                    data:data
                                                                });
                                                            }) 
                                                        }
                                                    })
                                                   
                                                }
                                            })
                                        }
                                    })
                                }
                            });
                        }
                    })

                }
               })
            }
        }); 
    } catch (err) {
        reject(err);
    }
});
};
/* GET Lists. */
module.exports.getList = function(req, res) {
  let slugC = req.params.slugC;
  return new Promise(function(resolve, reject) {
    try {
        const result = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id  WHERE   posts.isactive = 1 and  slugC = "' + slugC + '" ';
        db.query(result, function(err, list, fields){
            if (err) {
                return reject(err);
            } else{
                const menuQ = 'SELECT typenews.type_id,typenews.category_id,slugC, name, GROUP_CONCAT(DISTINCT type_name) type_name, GROUP_CONCAT(DISTINCT slugT) slugT  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories  on categories.category_id = typenews.category_id group by name';
                    db.query(menuQ, function(err, nav, fields){
                        if (err) {
                            return reject(err);
                        }else{
                            const  popularPostQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id  where posts.isactive = 1 ORDER BY views_count DESC LIMIT 9';
                            db.query(popularPostQ, function(err, popularPost, fields){
                                if (err) {
                                    return reject(err);
                                }else{
                                    const mostReaderQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where  posts.isactive = 1 ORDER BY views_count DESC LIMIT 4';
                                    db.query(mostReaderQ, function(err, mostReader, fields) {
                                        if (err) {
                                            return reject(err);
                                        }else{
                                            const mostPopularQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where  posts.isactive = 1 ORDER BY publish_date DESC LIMIT 4';
                                            db.query(mostPopularQ, function (err, mostPopular, fields) {
                                                if (err) {
                                                    return reject(err);
                                                }else{
                                                    const getTagQ = 'Select DISTINCT tags, slug_tag from tags';
                                                    db.query(getTagQ, function(err, gettag, fields){
                                                        if (err) {
                                                            return reject(err);
                                                        }else{
                                                            resolve({
                                                                list: list.rows,
                                                                nav:nav,
                                                                popularPost:popularPost,
                                                                mostPopular:mostPopular,
                                                                mostReader:mostReader,
                                                                gettag:gettag
                                                                
                                                            })
                                                            let data = {
                                                                list: list,
                                                                nav:nav,
                                                                popularPost:popularPost,
                                                                mostPopular:mostPopular,
                                                                mostReader:mostReader,
                                                                gettag:gettag
                                                            }
                                                            res.render('pages/list', {
                                                                data:data
                                                            });
                                                        }
                                                    })
                                                   
                                                }
                                            })
                                        }
                                    })
                                }
                            });
                        }
                    })
            }
        }); 
    } catch (err) {
        reject(err);
    }
});
};
/* GET Lists Submenu. */
module.exports.getType = function(req, res) {
    let slugT = req.params.slug;
    return new Promise(function(resolve, reject) {
        try {
            const result = ' SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where slugT = "' + slugT + '" ' ;
            db.query(result, function(err, list, fields){
                if (err) {
                    return reject(err);
                } else{
                    const menuQ = 'SELECT typenews.type_id,typenews.category_id,slugC, name, GROUP_CONCAT(DISTINCT type_name) type_name, GROUP_CONCAT(DISTINCT slugT) slugT  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories  on categories.category_id = typenews.category_id group by name';
                        db.query(menuQ, function(err, nav, fields){
                            if (err) {
                                return reject(err);
                            }else{
                                const  popularPostQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where  posts.isactive = 1 ORDER BY views_count DESC LIMIT 9';
                                db.query(popularPostQ, function(err, popularPost, fields){
                                    if (err) {
                                        return reject(err);
                                    }else{
                                        const mostReaderQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where  posts.isactive = 1 ORDER BY views_count DESC LIMIT 4';
                                        db.query(mostReaderQ, function(err, mostReader, fields) {
                                            if (err) {
                                                return reject(err);
                                            }else{
                                                const mostPopularQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where  posts.isactive = 1 ORDER BY publish_date DESC LIMIT 4';
                                                db.query(mostPopularQ, function (err, mostPopular, fields) {
                                                    if (err) {
                                                        return reject(err);
                                                    }else{
                                                        const getTagQ = 'Select DISTINCT tags, slug_tag from tags';
                                                        db.query(getTagQ, function(err, gettag, fields){
                                                            if (err) {
                                                                return reject(err);
                                                            }else{
                                                                
                                                        resolve({
                                                            list: list.rows,
                                                            nav:nav,
                                                            popularPost:popularPost,
                                                            mostPopular:mostPopular,
                                                            mostReader:mostReader,
                                                            gettag:gettag
                                                        })
                                                        let data = {
                                                            list: list,
                                                            nav:nav,
                                                            popularPost:popularPost,
                                                            mostPopular:mostPopular,
                                                            mostReader:mostReader,
                                                            gettag:gettag
                                                        }
                                                        res.render('pages/submenu', {
                                                            data:data
                                                        });
                                                            }
                                                        })
                            
                                                    }
                                                })
                                            }
                                        })
                                    }
                                });
                            }
                        })
                }
            }); 
        } catch (err) {
            reject(err);
        }
    });
};
module.exports.getTagName = function(req, res) {
    return new Promise(function(resolve, reject) {
        try {
            let tag = req.params.tagN
            const result = ' SELECT * FROM tags WHERE slug_tag = "' + tag + '" ' ;
            db.query(result, function(err, list, fields){
                if (err) {
                    return reject(err);
                } else{
                    const menuQ = 'SELECT typenews.type_id,typenews.category_id,slugC, name, GROUP_CONCAT(DISTINCT type_name) type_name, GROUP_CONCAT(DISTINCT slugT) slugT  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories  on categories.category_id = typenews.category_id group by name';
                        db.query(menuQ, function(err, nav, fields){
                            if (err) {
                                return reject(err);
                            }else{
                                const  popularPostQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id  where  posts.isactive = 1 ORDER BY views_count DESC LIMIT 9';
                                db.query(popularPostQ, function(err, popularPost, fields){
                                    if (err) {
                                        return reject(err);
                                    }else{
                                        const mostReaderQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where  posts.isactive = 1  ORDER BY views_count DESC LIMIT 4';
                                        db.query(mostReaderQ, function(err, mostReader, fields) {
                                            if (err) {
                                                return reject(err);
                                            }else{
                                                const mostPopularQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where  posts.isactive = 1 ORDER BY publish_date  DESC LIMIT 4';
                                                db.query(mostPopularQ, function (err, mostPopular, fields) {
                                                    if (err) {
                                                        return reject(err);
                                                    }else{
                                                        const getTagQ = 'Select DISTINCT tags, slug_tag from tags';
                                                        db.query(getTagQ, function(err, gettag, fields){
                                                            if (err) {
                                                                return reject(err);
                                                            }else{
                                                                resolve({
                                                                    list: list.rows,
                                                                    nav:nav,
                                                                    popularPost:popularPost,
                                                                    mostPopular:mostPopular,
                                                                    mostReader:mostReader,
                                                                    gettag:gettag
                                                                })
                                                                let data = {
                                                                    list: list,
                                                                    nav:nav,
                                                                    popularPost:popularPost,
                                                                    mostPopular:mostPopular,
                                                                    mostReader:mostReader,
                                                                    gettag:gettag
                                                                }
                                                                res.render('pages/tag', {
                                                                    data:data
                                                                });
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                });
                            }
                        })
                }
            }); 
        } catch (err) {
            reject(err);
        }
    });
};
/*  Search. */
module.exports.getSearch = function(req, res) {
    return new Promise(function(resolve, reject) {
        try {
            const searchterm = req.body.searchterm;
            const result = 'SELECT DISTINCT post_id, title, description, content, image, views_count, publish_date,tag_name, typenews.type_id,slugT,slug FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id Where  posts.isactive = 1 and (title  LIKE "%' + searchterm + '%") OR (description LIKE "%' + searchterm + '%") OR (content  LIKE "%' + searchterm + '%") OR (tag_name  LIKE "%' + searchterm + '%") ORDER BY post_id';
            db.query(result, function(err, list, fields){
                if (err) {
                    return reject(err);
                } else{
                    const menuQ = 'SELECT typenews.type_id,typenews.category_id,slugC, name, GROUP_CONCAT(DISTINCT type_name) type_name, GROUP_CONCAT(DISTINCT slugT) slugT  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories  on categories.category_id = typenews.category_id group by name';
                        db.query(menuQ, function(err, nav, fields){
                            if (err) {
                                return reject(err);
                            }else{
                                const  popularPostQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where  posts.isactive = 1 ORDER BY views_count DESC LIMIT 9';
                                db.query(popularPostQ, function(err, popularPost, fields){
                                    if (err) {
                                        return reject(err);
                                    }else{
                                        const mostReaderQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where  posts.isactive = 1 ORDER BY views_count DESC LIMIT 4';
                                        db.query(mostReaderQ, function(err, mostReader, fields) {
                                            if (err) {
                                                return reject(err);
                                            }else{
                                                const mostPopularQ = 'SELECT *  FROM posts inner join typenews on typenews.type_id = posts.type_id inner join categories on categories.category_id = typenews.category_id where  posts.isactive = 1 ORDER BY publish_date DESC LIMIT 4';
                                                db.query(mostPopularQ, function (err, mostPopular, fields) {
                                                    if (err) {
                                                        return reject(err);
                                                    }else{
                                                        const getTagQ = 'Select DISTINCT tags, slug_tag from tags';
                                                        db.query(getTagQ, function(err, gettag, fields){
                                                            if (err) {
                                                                return reject(err);
                                                            }else{
                                                                resolve({
                                                                    list: list.row,
                                                                    nav:nav,
                                                                    popularPost:popularPost,
                                                                    mostPopular:mostPopular,
                                                                    mostReader:mostReader,
                                                                    gettag:gettag
                                                                    
                                                                })
                                                                let data = {
                                                                    list: list,
                                                                    nav:nav,
                                                                    popularPost:popularPost,
                                                                    mostPopular:mostPopular,
                                                                    mostReader:mostReader,
                                                                    gettag:gettag
                                                                }
                                                              
                                                                res.render('pages/search',{data:data})
                                                           
                                                            }
                                                        }) 
                                                        
                                                    }
                                                })
                                            }
                                        })
                                    }
                                });
                            }
                        })
                }
            }); 
        } catch (err) {
         
            reject(err);
        }
    });
};

