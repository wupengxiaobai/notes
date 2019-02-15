$.fn.waterFall = function() {
	var $items = $(this);
	var totalWidth = $items.width(); //  总宽度
	var $children = $items.children('div');
	var itemWdith = $children.width(); //  item宽度
	var column = 5; //  列数
	var space = (totalWidth - itemWdith * column) / (column - 1); //  间距
	var heightArr = [];
	var minIndex;
	var minHeight;

	//  计算每一个item的left和top值, 赋予绝对定位属性值
	$children.each(function(index, dom) {
		$dom = $(dom);
		minIndex = 0;
		minHeight = heightArr[minIndex];

		if (index < column) {
			//  头五个
			$dom.css({
				top: 0,
				left: index * (space + itemWdith)
			});

      heightArr.push($dom.height());


      // 这里为什么是179??????
      console.log($dom[0].offsetHeight)
      
		} else {
			//  其它
			for (var i = 0; i < heightArr.length; i++) {
				if (minHeight > heightArr[i]) {
					minIndex = i;
					minHeight = heightArr[i];
				}
			}

			$dom.css({
				top: minHeight + space,
				left: minIndex * (space + itemWdith)
			});

			heightArr[minIndex] = minHeight + space + $dom.height();
		}
	});

	//  计算赋值btn的top值
	var maxHeight = 0;
	for (var i = 0; i < heightArr.length; i++) {
		if (heightArr[i] > maxHeight) {
			maxHeight = heightArr[i];
		}
  }
  
	$('.items').css('height', maxHeight);
};

